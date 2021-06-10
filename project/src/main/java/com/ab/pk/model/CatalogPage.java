package com.ab.pk.model;

import com.ab.pk.enums.CatalogPageStatus;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity(name = "CatalogPage")
public class CatalogPage implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCatalogPage;

    @Column(name = "title")
    private String title;

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(name = "owner", nullable = true)
    private AppUser owner;

    @Column(name = "creationDate")
    private Date creationDate = new Date(System.currentTimeMillis());

    @Enumerated(EnumType.ORDINAL)
    private CatalogPageStatus status = CatalogPageStatus.ACTIVE;

    @Column(name = "description")
    private String description;


}
